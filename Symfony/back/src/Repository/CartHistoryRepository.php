<?php

namespace App\Repository;

use App\Entity\Cart;
use App\Entity\CartHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CartHistory>
 *
 * @method CartHistory|null find($id, $lockMode = null, $lockVersion = null)
 * @method CartHistory|null findOneBy(array $criteria, array $orderBy = null)
 * @method CartHistory[]    findAll()
 * @method CartHistory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CartHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CartHistory::class);
    }

    public function save(CartHistory $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CartHistory $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getActiveCartIDFromUser($user): CartHistory
    {
        return $this->createQueryBuilder('ch')
            ->innerJoin('ch.cart', 'c', 'WITH', 'c.id = ch.cart')
            ->where('ch.User = :user_id')
            ->andWhere('c.is_active = 1')
            ->setParameter('user_id', $user->getId())
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getDisableCartsFromUser($user): array
    {
        return $this->createQueryBuilder('ch')
            ->innerJoin('ch.cart', 'c', 'WITH', 'c.id = ch.cart')
            ->where('ch.User = :user_id')
            ->andWhere('c.is_active = 0')
            ->setParameter('user_id', $user->getId())
            ->getQuery()
            ->getResult();
    }
//    /**
//     * @return CartHistory[] Returns an array of CartHistory objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CartHistory
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
