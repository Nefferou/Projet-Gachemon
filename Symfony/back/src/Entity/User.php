<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
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

    #[ORM\Column(length: 255)]
    #[ORM\OneToOne(mappedBy: 'id', cascade: ['persist', 'remove'])]
    private ?Profile $profile_id = null;

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
    
    public function getIdProfile(): ?string
    {
        return $this->profile_id;
    }

    public function getProfileId(): ?Profile
    {
        return $this->profile_id;
    }

    public function setProfileId(int $profile_id): self
    {
        $new_profile = new Profile();
        $new_profile->setId($profile_id)
        ->setUserId($this)
        ->setPc("")
        ->setCryptokemon(10.0);
        $this->profile_id = $new_profile;
        return $this;
    }
}
