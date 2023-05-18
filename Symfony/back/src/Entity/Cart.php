<?php

namespace App\Entity;

use App\Repository\CartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartRepository::class)]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private array $items = [];

    #[ORM\Column]
    private ?int $total_price = null;

    #[ORM\Column]
    private ?bool $is_active = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\OneToMany(mappedBy: 'cart', targetEntity: CartHistory::class)]
    private Collection $cartHistory;

    public function __construct()
    {
        $this->cartHistory = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function setItems(array $items): self
    {
        $this->items = $items;

        return $this;
    }

    public function getTotalPrice(): ?int
    {
        return $this->total_price;
    }

    public function setTotalPrice(int $total_price): self
    {
        $this->total_price = $total_price;

        return $this;
    }

    public function isIsActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): self
    {
        $this->is_active = $is_active;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(): self
    {
        $this->created_at = new \DateTimeImmutable();
        
        return $this;
    }

    /**
     * @return Collection<int, CartHistory>
     */
    public function getCartHistory(): Collection
    {
        return $this->cartHistory;
    }

    public function addCartHistory(CartHistory $cartHistory): self
    {
        if (!$this->cartHistory->contains($cartHistory)) {
            $this->cartHistory->add($cartHistory);
            $cartHistory->setCart($this);
        }

        return $this;
    }

    public function removeCartHistory(CartHistory $cartHistory): self
    {
        if ($this->cartHistory->removeElement($cartHistory)) {
            // set the owning side to null (unless already changed)
            if ($cartHistory->getCart() === $this) {
                $cartHistory->setCart(null);
            }
        }

        return $this;
    }
}
