<?php

namespace App\Entity;

use App\Repository\ProfileRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProfileRepository::class)]
class Profile
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $cryptokemon = null;

    #[ORM\Column(length: 65000)]
    private ?string $pc = null;

    #[ORM\OneToOne(inversedBy: 'profile_id', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    private ?User $user = null;

    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCryptokemon(): ?float
    {
        return $this->cryptokemon;
    }

    public function setCryptokemon(float $cryptokemon): self
    {
        $this->cryptokemon = $cryptokemon;

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

    public function getUserId(): ?User
    {
        return $this->user;
    }

    public function setUserId(User $user_id): self
    {
        $this->user = $user_id;

        return $this;
    }
    public function toString(): String
    {
        return $this->getId()+" : "+$this->getPc()+" : "+$this->getCryptokemon();
    }
}
