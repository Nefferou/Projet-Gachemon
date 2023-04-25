<?php
namespace App\Controller;

use App\Security\JwtTokenGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Firebase\JWT\JWT;
use Doctrine\ORM\EntityManagerInterface;
class UserController extends AbstractController
{
    private $jwtTokenGenerator;

    public function __construct(JwtTokenGenerator $jwtTokenGenerator)
    {
        $this->jwtTokenGenerator = $jwtTokenGenerator;
    }

    #[Route('/api/user/login', name: 'api_user_connection', methods: ['POST'])]
    public function actionConnection(EntityManagerInterface $entityManager): JsonResponse
    {
        $request = Request::createFromGlobals();
        $parameters = json_decode($request->getContent(), true);
        if(
            !isset($parameters['username']) ||
            !isset($parameters['password'])
        ){
            return new JsonResponse([
                'error' => 'Missing parameters'
            ], Response::HTTP_BAD_REQUEST);
        }

        $repo = $entityManager->getRepository(User::class);
        $user = $repo->verifyAccountByUsernameAndPassword($parameters['username'], $parameters['password']);
        if (is_null($user)) {
            return new JsonResponse([
                'error' => 'Wrong Account'
            ], Response::HTTP_NOT_FOUND);
        }
        $token = $this->jwtTokenGenerator->generateToken($user);
        return new JsonResponse(json_encode(
            [
                'user' => $this->showUser($user),
                'token' => $token
            ]
        ),
          Response::HTTP_OK, ['accept' => 'json', 'Authorization' => 'Bearer '.$token], true);
    }

    #[Route('/api/user/register', name: 'api_user_register', methods: ['POST'])]
    public function actionRegister(EntityManagerInterface $entityManager): JsonResponse
    {
        $request = Request::createFromGlobals();
        $data = json_decode($request->getContent(), true);
        if (
            !isset($data['username']) ||
            !isset($data['password']) ||
            !isset($data['email'])) {
            return new JsonResponse([
                'error' => 'Missing parameters'
            ], Response::HTTP_BAD_REQUEST);
        }
        $username = $data['username'];
        $password = $data['password'];
        $email = $data['email'];


        $repoUser = $entityManager->getRepository(User::class);
        if(!is_null($repoUser->verifyAccountByUsernameAndPassword($data['username'], $data['password']))){
            return new JsonResponse([
                'error' => 'Account already exist'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $user = new User();
        
        $user->setUsername($username)->setPassword($password)->setEmail($email)->setPc("{\"pokemonFav\":\"\",\"pokemons\":[]}")->setCryptokemons(10.0);
        if (is_null($user)) {
            return new JsonResponse([
                'error' => 'Not Acceptable'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }
        $repoUser->save($user, true);

        //Création du token JWT pour l'utilisateur
        $token = $this->jwtTokenGenerator->generateToken($user);

        return new JsonResponse(json_encode(['message' => 'Création du compte réussie', 'token' => $token]), Response::HTTP_CREATED, ['accept' => 'json', 'Authorization' => 'Bearer '.$token], true);
    }

    #[Route('/api/user/email', name: 'api_user_email', methods: ['POST'])]
    public function actionVerification(EntityManagerInterface $entityManager): Response
    {
        $request = Request::createFromGlobals();
        $parameters = json_decode($request->getContent(), true);

        $repo = $entityManager->getRepository(User::class);
        $user = $repo->verifyAccountByEmail($parameters['email']);
        if (($user)) {
            return new Response(
                'Email already used', Response::HTTP_NOT_ACCEPTABLE);
        }else{
            return new Response('Email not used', Response::HTTP_ACCEPTED);
        }
    }

    #[Route('/api/user/username', name: 'api_user_username', methods: ['POST'])]
    public function actionVerificationUsername(EntityManagerInterface $entityManager): Response
    {
        $request = Request::createFromGlobals();
        $parameters = json_decode($request->getContent(), true);

        $repo = $entityManager->getRepository(User::class);
        if (($repo->verifyAccountByUsername($parameters['username']))) {
            return new Response(
                'Username already used', Response::HTTP_NOT_ACCEPTABLE);
        }else{
            return new Response('Username not used', Response::HTTP_ACCEPTED);
        }
    }

    #[Route('/api/token/verify', name: 'api_utoken_verify', methods: ['POST'])]
    public function actionVerificationToken(Request $request): Response
    {
        $token = $request->headers->get('token');
        if (!$token) {
            return new Response('No token provided', Response::HTTP_BAD_REQUEST);
        }
    
        if ($this->jwtTokenGenerator->verifyToken($token)) {
            return new Response('Token valid', Response::HTTP_ACCEPTED);
        } else {
            return new Response('Token invalid', Response::HTTP_NOT_ACCEPTABLE);
        }
    }
    
    #[Route('/api/pc/update', name: 'api_update_pc', methods: ['POST'])]
    public function actionUpdatePc(Request $request, EntityManagerInterface $entityManager): Response
    {
        $token = $request->headers->get('token');
        if (!$token) {
            return new Response('No token provided', Response::HTTP_BAD_REQUEST);
        }
        if(!$this->jwtTokenGenerator->verifyToken($token)){
            return new Response('Token invalid', Response::HTTP_NOT_ACCEPTABLE);
        }
        $user = $this->jwtTokenGenerator->decodeToken($token);
        $request = Request::createFromGlobals();
        $parameters = json_decode($request->getContent(), true);

        if (is_null($user)) {
            return new Response('Token invalid', Response::HTTP_NOT_ACCEPTABLE);
        }
        $repo = $entityManager->getRepository(User::class);
        $user->setPc(json_encode($parameters['pc']));
        var_dump($user);
        $repo->save($user, true);
        return new Response('Pc updated', Response::HTTP_ACCEPTED);
    }

        public function showUser(User $user){
            return array([
                "id" => $user->getId(),
                "username" => $user->getUsername(),
                "email" => $user->getEmail(),
                "pc" => $user->getPc(),
                "cryptokemons" => $user->getCryptokemons()
            ]);
        }

        public function serializeUser(User $user){
            return array([
                "username" => $user->getUsername(),
                "password" => $user->getPassword()
            ]);
        }

    }
