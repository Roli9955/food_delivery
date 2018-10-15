package hu.elte.Food_delivery.repositories;

import hu.elte.Food_delivery.entities.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer>{
    
}
