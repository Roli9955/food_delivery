package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Piece;
import hu.elte.Food_delivery.entities.Product;
import hu.elte.Food_delivery.entities.Reservation;
import hu.elte.Food_delivery.repositories.PieceRepository;
import hu.elte.Food_delivery.repositories.ProductRepository;
import hu.elte.Food_delivery.repositories.ReservationRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private PieceRepository pieceRepository;
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Iterable<Reservation>> getAll(){
        Iterable<Reservation> reservations = reservationRepository.findAll();
        return ResponseEntity.ok(reservations);
    }
    
    @PostMapping("")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_USER" })
    public ResponseEntity<Reservation> post(@RequestBody Reservation reservation){
        reservation.setId(null);
       return ResponseEntity.ok(reservationRepository.save(reservation));
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
    
    @DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity delete(@PathVariable Integer id){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        reservationRepository.delete(oReservation.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Reservation> put(@PathVariable Integer id, 
                                        @RequestBody Reservation reservation){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        reservation.setId(id);
        return ResponseEntity.ok(reservationRepository.save(reservation));
    }
    
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
                if(p.getProducts().getId().equals(pr.getId())){
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
                if(Objects.equals(piece.getProducts().getId(), p.getProducts().getId())){
                    p.setPiece(piece.getPiece());
                    pieceRepository.save(p);
                    l = true;
                    break;
                }
            }
            if(l) continue;
            Optional<Product> oProduct = productRepository.findById(piece.getProducts().getId());
            if(!oProduct.isPresent()){
                return ResponseEntity.notFound().build();
            }
            piece.setProducts(oProduct.get());
            piece.setId(null);
            piece.setReservations(pieceReservation);
            oReservation.get().getPieces().add(piece);
            pieceRepository.save(piece);
        }
        return ResponseEntity.ok(oReservation.get().getPieces());
    }
    
}
