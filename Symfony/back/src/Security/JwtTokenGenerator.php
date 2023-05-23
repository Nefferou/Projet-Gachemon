<?php

namespace App\Security;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use PhpParser\Node\Expr\Cast\Object_;

class JwtTokenGenerator extends JWTAuthenticator
{
    private string $jwtSecret;
    private User $payload;

    public function getsecret(): string
    {
        return $this->jwtSecret;
    }

    public function getPayload(): User
    {
        return $this->payload;
    }

    public function __construct()
    {
        $this->jwtSecret = '%env(JWT_SECRET_KEY)%';
    }

    public function generateToken(User $user): string
    {
        $payload = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
            'email' => $user->getEmail(),
            'cryptokemons' => $user->getCryptokemons(),
            'pc' => $user->getPc(),
            'isAdmin' => $user->getIsAdmin(),
        ];

        return JWT::encode($payload, $this->jwtSecret,'HS256');
    }

    public function verifyToken(string $token): bool
    {
        try {
            JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    public function decodeToken(string $token): User
    {
        $params = JWT::decode($token, new Key($this->jwtSecret, 'HS256'), ['HS256']);
        $this->payload = new User();
        $this->payload->setId($params->id);
        $this->payload->setUsername($params->username);
        $this->payload->setPassword($params->password);
        $this->payload->setEmail($params->email);
        $this->payload->setCryptokemons($params->cryptokemons);
        $this->payload->setPc($params->pc);
        $this->payload->setIsAdmin($params->isAdmin);
        return $this->getPayload();
    }

}
