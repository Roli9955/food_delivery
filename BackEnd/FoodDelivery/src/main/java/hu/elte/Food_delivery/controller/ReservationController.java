package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Piece;
import hu.elte.Food_delivery.entities.Product;
import hu.elte.Food_delivery.entities.Reservation;
import hu.elte.Food_delivery.entities.User;
import hu.elte.Food_delivery.repositories.PieceRepository;
import hu.elte.Food_delivery.repositories.ProductRepository;
import hu.elte.Food_delivery.repositories.ReservationRepository;
import hu.elte.Food_delivery.repositories.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.GenerationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/reservation")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private PieceRepository pieceRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Iterable<Reservation>> getAll(){
        Iterable<Reservation> reservations = reservationRepository.findAll();
        return ResponseEntity.ok(reservations);
    }
    
    
    @PostMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_USER" })
    public ResponseEntity<Reservation> post(@RequestBody Reservation reservation, @PathVariable Integer id){
       
        Optional<User> oUser = userRepository.findById(id);
        if(!oUser.isPresent()){
            return ResponseEntity.notFound().build();
        }
        reservation.setUser(oUser.get());
        reservation.setId(null);
        reservationRepository.save(reservation);
        
        List<Reservation> tmpReservation = new ArrayList<>();
        tmpReservation.add(reservation);
        
        for(Piece piece: reservation.getPieces()){
           Optional<Product> oProduct = productRepository.findById(piece.getProduct().getId());
           if(!oProduct.isPresent()){
               return ResponseEntity.notFound().build();
           }
           piece.setId(null);
           piece.setProduct(oProduct.get());
           piece.setReservations(tmpReservation);
           pieceRepository.save(piece);
       }

       return ResponseEntity.ok().build();
    }
    
    @GetMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_USER" })
    public ResponseEntity<Reservation> get(@PathVariable Integer id){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oReservation.get());
    }
    
    /*@DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity delete(@PathVariable Integer id){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        reservationRepository.delete(oReservation.get());
        return ResponseEntity.ok().build();
    }*/
    
    /*@PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Reservation> put(@PathVariable Integer id, 
                                        @RequestBody Reservation reservation){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        reservation.setId(id);
        return ResponseEntity.ok(reservationRepository.save(reservation));
    }*/
    
    @DeleteMapping("/{id}/product")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity deleteProductFromReservation(@PathVariable Integer id, @RequestBody List<Product> products){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        
        for(Piece p: oReservation.get().getPieces()){
            for(Product pr: products){
                Optional<Product> oProduct = productRepository.findById(pr.getId());
                if(!oProduct.isPresent()){
                    return ResponseEntity.notFound().build();
                }
                if(p.getProduct().getId().equals(pr.getId())){
                    pieceRepository.delete(p);
                    break;
                }
            }
        }
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/product")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Iterable<Piece>> addProductsToReservation(@PathVariable Integer id, 
                                                                        @RequestBody List<Piece> pieces){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        List<Reservation> pieceReservation = new ArrayList<>();
        pieceReservation.add(oReservation.get());
        for(Piece piece: pieces){
            Boolean l = false;
            for(Piece p: oReservation.get().getPieces()){
                if(Objects.equals(piece.getProduct().getId(), p.getProduct().getId())){
                    p.setPiece(piece.getPiece());
                    pieceRepository.save(p);
                    l = true;
                    break;
                }
            }
            if(l) continue;
            Optional<Product> oProduct = productRepository.findById(piece.getProduct().getId());
            if(!oProduct.isPresent()){
                return ResponseEntity.notFound().build();
            }
            piece.setProduct(oProduct.get());
            piece.setId(null);
            piece.setReservations(pieceReservation);
            oReservation.get().getPieces().add(piece);
            pieceRepository.save(piece);
        }
        return ResponseEntity.ok(oReservation.get().getPieces());
    }
    
}
