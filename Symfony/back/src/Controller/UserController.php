<?php
namespace App\Controller;

use App\Entity\Profile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserController extends AbstractController
{
        #[Route('/api/user/login', name: 'api_user_connection', methods: ['POST'])]
        public function actionConnection(EntityManagerInterface $entityManager): JsonResponse
        {
            $request = Request::createFromGlobals();
            $parameters = json_decode($request->getContent(), true);
            $repo = $entityManager->getRepository(User::class);
            $user = $repo->verifyAccountByUsernameAndPassword($parameters['username'], $parameters['password']);
            if (is_null($user)) {
                return new JsonResponse([
                    'error' => 'Wrong Account'
                ], Response::HTTP_NOT_FOUND);
            }

            return new JsonResponse(json_encode($this->showUser($user)), Response::HTTP_OK, ['accept' => 'json'], true);
        }

        #[Route('/api/user', name: 'api_user_register', methods: ['Post'])]
        public function actionRegister(EntityManagerInterface $entityManager): JsonResponse
        {
            $request = Request::createFromGlobals();
            $content = $request->getContent();

            $data = json_decode($content, true);
            $username = $data['username'];
            $password = $data['password'];
            $email = $data['email'];
            $repoUser = $entityManager->getRepository(User::class);
            $user = new User();
            $user->setUsername($username)->setPassword($password)->setEmail($email)->setPc("{}")->setCryptokemons(10.0);
            if (is_null($user)) {
                return new JsonResponse([
                    'error' => 'Not Acceptable'
                ], Response::HTTP_NOT_ACCEPTABLE);
            }
            $repoUser->save($user, true);
            return new JsonResponse("Création du compte réussie", Response::HTTP_CREATED, ['accept' => 'json'], true);
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

        public function showUser(User $user){
            return array([
                "id" => $user->getId(),
                "username" => $user->getUsername(),
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
