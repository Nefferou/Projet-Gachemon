<?php

namespace App\Security;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;

class JwtTokenGenerator extends JWTAuthenticator
{
    private string $jwtSecret;

    public function getsecret(): string
    {
        return $this->jwtSecret;
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
            'email' => $user->getEmail(),
            'cryptokemons' => $user->getCryptokemons(),
            'pc' => $user->getPc(),
        ];

        return JWT::encode($payload, $this->jwtSecret,'HS256');
    }

    public function verifyToken(string $token): bool
    {
        try { 
            var_dump($token);
            $payload = JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }

}
