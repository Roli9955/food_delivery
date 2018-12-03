package hu.elte.Food_delivery.repositories;

import hu.elte.Food_delivery.entities.Piece;
import hu.elte.Food_delivery.entities.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer>{
    
}
