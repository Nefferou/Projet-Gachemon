<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Expr\List_;

class UserController extends AbstractController
{

    #[Route('/api/user', name: 'api_user',methods: ['GET'])]
    public function actionConnection(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {   
        if($parameters = json_decode($request->getContent(), true) != null){
        
        $repo = $entityManager->getRepository(User::class);
        $user = $repo->verifyAccount($parameters['username'],$parameters['password']);
        if(is_null($user)){
            return new JsonResponse([
                'error' => 'Wrong Account'
            ], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($this->serializeUser($user), Response::HTTP_OK, ['accept' => 'json'], true);
        }else{
            $repo = $entityManager->getRepository(User::class);
            $user = $repo->findAllUsers();
            $this->serializeArrayUser($user);
            return new JsonResponse($this->serializeUser($user), Response::HTTP_OK, ['accept' => 'json'], true);
        }
    }

    #[Route('/api/user', name: 'api_user',methods: ['Post'])]
    public function actionRegister(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {   
        $parameters = json_decode($request->getContent(), true);
        $repo = $entityManager->getRepository(User::class);
        $user = new User();
        $id_profile = $repo->findLastIdPlayer();
        $user->setUsername($parameters['username'])->setPassword($parameters['password'])->setIdProfile($id_profile+1);
        
        if(is_null($user)){
            return new JsonResponse([
                'error' => 'Not Acceptable'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }
        $repo->save($user);
        $repo->flush();
        return new JsonResponse($this->serializeUser($user),Response::HTTP_CREATED, ['accept' => 'json'], true);
    }

    
    private function serializeUser(User $user)
    {
        return array(
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
            'id_profile' => $user->getIdProfile()
        );
    }
    private function serializeArrayUser(List_ $users)
    {
        $listUser = array();
        foreach ($users as $user) {
            $listUser += json_encode($this->serializeUser($user));
        }
        return $listUser;
    }
}
