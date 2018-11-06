package hu.elte.Food_delivery.repositories;

import hu.elte.Food_delivery.entities.Piece;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PieceRepository extends CrudRepository<Piece, Integer>{
    
}
