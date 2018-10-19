package hu.elte.Food_delivery.repositories;

import hu.elte.Food_delivery.entities.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer>{
    
}
