package hu.elte.Food_delivery.repositories;

import hu.elte.Food_delivery.entities.User;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
    public Optional<User> findByEmail(String username);
}
