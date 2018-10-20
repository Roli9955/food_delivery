package hu.elte.Food_delivery.repositories;

import hu.elte.Food_delivery.entities.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer>{

}
