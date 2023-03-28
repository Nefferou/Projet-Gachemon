
    <?php
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\User;
    use Doctrine\ORM\EntityManagerInterface;

    class UserController extends AbstractController
    {

        #[Route('/api/user', name: 'api_user_connection', methods: ['GET'])]
        public function actionConnection(EntityManagerInterface $entityManager): JsonResponse
        {
            $request = Request::createFromGlobals();
            $parameters = json_decode($request->getContent(), true);

            $repo = $entityManager->getRepository(User::class);
            $user = $repo->verifyAccount($parameters['username'], $parameters['password']);
            if (is_null($user)) {
                return new JsonResponse([
                    'error' => 'Wrong Account'
                ], Response::HTTP_NOT_FOUND);
            }

            return new JsonResponse(json_encode($this->serializeUser($user)), Response::HTTP_OK, ['accept' => 'json'], true);
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
            $repo = $entityManager->getRepository(User::class);
            $user = new User();
            $id_profile = $repo->findLastIdPlayer()[0]['id_profile'];
            return new JsonResponse($data, Response::HTTP_CREATED, ['accept' => 'json'], true);
            $user->setUsername($username)->setPassword($password)->setEmail($email)->setIdProfile($id_profile + 1);

            if (is_null($user)) {
                return new JsonResponse([
                    'error' => 'Not Acceptable'
                ], Response::HTTP_NOT_ACCEPTABLE);
            }
            $repo->save($user, true);
            return new JsonResponse(json_encode($this->serializeUser($user)), Response::HTTP_CREATED, ['accept' => 'json'], true);
        }


        private function serializeUser(User $user)
        {
            return array(
                'username' => $user->getUsername(),
                'password' => $user->getPassword(),
                'email' => $user->getEmail(),
                'id_profile' => $user->getIdProfile()
            );
        }
    }
