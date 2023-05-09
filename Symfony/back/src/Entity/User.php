<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;


#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column]
    private ?float $cryptokemons = null;

    #[ORM\Column(length: 250000)]
    private ?string $pc = null;

    public function setId($id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCryptokemons(): ?float
    {
        return $this->cryptokemons;
    }

    public function setCryptokemons(float $cryptokemons): self
    {
        $this->cryptokemons = $cryptokemons;

        return $this;
    }

    public function getPc(): ?string
    {
        return $this->pc;
    }

    public function setPc(string $pc): self
    {
        $this->pc = $pc;

        return $this;
    }
    public function getUserIdentifier(): string
    {
        return $this->username;
    }

    public function getRoles(): array
    {
        // Ici, vous pouvez retourner les rôles de l'utilisateur en fonction de votre logique.
        // Par défaut, nous retournons simplement un rôle "ROLE_USER".
        return ['ROLE_USER'];
    }

    public function getSalt(): ?string
    {
        // Depuis Symfony 5.3, les encodeurs de mots de passe utilisent l'API Password Hasher
        // qui n'a pas besoin de sel, donc cette méthode peut retourner null.
        return null;
    }

    public function eraseCredentials()
    {
        // Cette méthode est généralement utilisée pour effacer les informations sensibles,
        // comme un mot de passe brut, qui ne doivent pas être stockées en mémoire.
        // Vous pouvez laisser cette méthode vide si vous n'avez pas besoin de l'utiliser.
    }
}
