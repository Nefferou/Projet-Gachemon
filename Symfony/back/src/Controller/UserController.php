<?php
namespace App\Controller;

use App\Entity\Cart;
use App\Entity\CartHistory;
use App\Security\JwtTokenGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Firebase\JWT\JWT;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\VarDumper\VarDumper;

class UserController extends AbstractController
{
    private $jwtTokenGenerator;

    public function __construct(JwtTokenGenerator $jwtTokenGenerator)
    {
        $this->jwtTokenGenerator = $jwtTokenGenerator;
    }

    #[Route('/api/user/login', name: 'api_user_connection', methods: ['POST'])]
    public function actionConnection(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordEncoder): JsonResponse
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
        $user = $repo->findOneBy(['username' => $parameters['username']]);
        if (!$user || !$passwordEncoder->isPasswordValid($user, $parameters['password'])) {
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
    public function actionRegister(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordEncoder): JsonResponse
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

        $cart = new Cart();
        $cart->setItems([]); // Mettez les données correctes de l'élément du panier
        $cart->setTotalPrice(0); // Définir le prix total du panier
        $cart->setIsActive(true); // Activer le panier
        $cart->setCreatedAt(new \DateTime()); // Définir la date de création du panier

        $user = new User();
        $user->setUsername($username)->setEmail($email)->setPc("[1,4,7,152,155,158,252,255,258,387,390,393,495,498,501,650,653,656,722,725,728,810,813,816]")->setPokemonFav("[]")->setCryptokemons(10.0);
        $hashedPassword = $passwordEncoder->hashPassword(new User(), $password);
        $user->setPassword($hashedPassword);

        if (is_null($user)) {
            return new JsonResponse([
                'error' => 'Not Acceptable'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }
        $cartHistory = new CartHistory();
        $user->addCartHistory($cartHistory);

        $cartHistory->setCart($cart);
        $cartHistory->setUser($user);

        $entityManager->getRepository(Cart::class)->save($cart, true);
        $entityManager->getRepository(CartHistory::class)->save($cartHistory, true);
        //Création du token JWT pour l'utilisateur
        $token = $this->jwtTokenGenerator->generateToken($user);

        return new JsonResponse(
            json_encode(['message' => 'Création du compte réussie', 'token' => $token]),
            Response::HTTP_CREATED, ['accept' => 'json', 'Authorization' => 'Bearer '.$token],
            true
        );
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

    #[Route('/api/token/verify', name: 'api_utoken_verify', methods: ['GET'])]
    public function actionVerificationToken(Request $request, JwtTokenGenerator $jwtTokenGenerator): Response
    {
        $token = $request->headers->get('Authorization');
        if (!$token) {
            return new JsonResponse(['error' => 'No token provided'], Response::HTTP_BAD_REQUEST);
        }
    
        if (!$jwtTokenGenerator->verifyToken($token)) {
            return new JsonResponse(['error' => 'Token invalid'], Response::HTTP_NOT_ACCEPTABLE);
        }
    
        $user = $jwtTokenGenerator->decodeToken($token);
        
    
        return new JsonResponse($this->showUser($user), Response::HTTP_ACCEPTED);
    }
    
    #[Route('/api/update/user/pc', name: 'api_update_pc', methods: ['PUT'])]
    public function actionUpdatePc(Request $request, EntityManagerInterface $entityManager): Response
    {
        $token = $request->headers->get('Authorization');
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
        
        $repo->save($user, true);
        return new Response('Pc updated', Response::HTTP_ACCEPTED);
    }


    #[Route('/api/update/user/cryptokemons', name: 'api_update_cryptokemon', methods: ['PUT'])]
    public function actionUpdateCryptokemon(Request $request, EntityManagerInterface $entityManager): Response
    {
        $token = $request->headers->get('Authorization');
        if (!$token) {
            return new Response('No token provided', Response::HTTP_BAD_REQUEST);
        }
        if(!$this->jwtTokenGenerator->verifyToken($token)){
            return new Response('Token invalid', Response::HTTP_NOT_ACCEPTABLE);
        }
        $user = $this->jwtTokenGenerator->decodeToken($token);
        $request = Request::createFromGlobals();
        $parameters = json_decode($request->getContent(), true);
        $repo = $entityManager->getRepository(User::class);
        $user->setCryptokemons($parameters['cryptokemons']);

        $repo->save($user, true);
        return new Response('Cryptokemons updated', Response::HTTP_ACCEPTED);
    }

    #[Route('/api/update/user/pokemonFav', name: 'api_update_pokemonFav', methods: ['PUT'])]
    public function actionUpdatePokemonFav(Request $request, EntityManagerInterface $entityManager): Response
    {
        $token = $request->headers->get('Authorization');
        if (!$token) {
            return new Response('No token provided', Response::HTTP_BAD_REQUEST);
        }
        if(!$this->jwtTokenGenerator->verifyToken($token)){
            return new Response('Token invalid', Response::HTTP_NOT_ACCEPTABLE);
        }
        $user = $this->jwtTokenGenerator->decodeToken($token);
        $request = Request::createFromGlobals();
        $parameters = json_decode($request->getContent(), true);
        $repo = $entityManager->getRepository(User::class);
        $user->setPokemonFav(json_encode($parameters['pokemonFav']));

        $repo->save($user, true);
        return new Response('PokemonFav updated', Response::HTTP_ACCEPTED);
    }

    #[Route('/api/update/cart', name:'api_update_cart', methods:['PUT'])]
    public function actionUpdateCart(Request $request, EntityManagerInterface $entityManager): Response
    {
        $token = $request->headers->get('Authorization');
        if (!$token) {
            return new Response('No token provided', Response::HTTP_BAD_REQUEST);
        }
        if(!$this->jwtTokenGenerator->verifyToken($token)){
            return new Response('Token invalid', Response::HTTP_NOT_ACCEPTABLE);
        }
        $user = $this->jwtTokenGenerator->decodeToken($token);
        $request = Request::createFromGlobals();
        $parameters = json_decode($request->getContent(), true);

        $repoCart = $entityManager->getRepository(Cart::class);
        $cartHistory = $entityManager->getRepository(CartHistory::class)->getActiveCartIDFromUser($user);

        $cart = $repoCart->findOneBy(array('id' => $cartHistory->getCart()));

        $cart->setItems($parameters["cart"]);
        $cart->setTotalPrice($parameters["totalPrice"]);
        $cart->setIsActive($parameters["isActive"]);
        $entityManager->getRepository(Cart::class)->save($cart, true);

        return new Response('Cart updated', Response::HTTP_ACCEPTED);
    }

    #[Route('/api/get/cartHistory', name:'api_update_cartHistory', methods:['GET'])]
    public function actionGetCartHistory(Request $request, EntityManagerInterface $entityManager): Response
    {
        $token = $request->headers->get('Authorization');
        if (!$token) {
            return new Response('No token provided', Response::HTTP_BAD_REQUEST);
        }
        if(!$this->jwtTokenGenerator->verifyToken($token)){
            return new Response('Token invalid', Response::HTTP_NOT_ACCEPTABLE);
        }
        $user = $this->jwtTokenGenerator->decodeToken($token);
        $oldCarts = $entityManager->getRepository(CartHistory::class)->getDisableCartsFromUser($user);
        $cartHistory = $entityManager->getRepository(CartHistory::class)->getActiveCartIDFromUser($user);

        return new JsonResponse(json_encode(
            [
                'active_cart' => $this->showCartHistory($cartHistory),
                'old_carts' => $this->showOldCart($oldCarts)
            ]
        )
            , Response::HTTP_ACCEPTED);
    }

    public function showUser(User $user){
        return array([
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "email" => $user->getEmail(),
            "password" => $user->getPassword(),
            "pc" => $user->getPc(),
            "cryptokemons" => $user->getCryptokemons(),
            "pokemonFav" => $user->getPokemonFav()
        ]);
    }

    public function showCart(Cart $cart){
        return array([
            "id" => $cart->getId(),
            "items" => $cart->getItems(),
            "totalPrice" => $cart->getTotalPrice(),
            "created_at" => $cart->getCreatedAt()
        ]);
    }

    public function showCartHistory(CartHistory $cartHistory){
        return array([
            "id" => $cartHistory->getId(),
            "cart" => $this->showCart($cartHistory->getCart())
        ]);
    }

    public function showOldCart($oldCarts){
        $oldCartsArray = [];
        foreach ($oldCarts as $oldCart){
            array_push($oldCartsArray, $this->showCartHistory($oldCart));
        }
        return $oldCartsArray;
    }

        public function serializeUser(User $user){
            return array([
                "username" => $user->getUsername(),
                "password" => $user->getPassword()
            ]);
        }

    }
