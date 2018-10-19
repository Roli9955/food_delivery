package hu.elte.Food_delivery.repositories;

import hu.elte.Food_delivery.entities.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer>{
    
}
