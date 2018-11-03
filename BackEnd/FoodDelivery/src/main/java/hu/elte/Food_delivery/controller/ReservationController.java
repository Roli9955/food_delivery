package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Product;
import hu.elte.Food_delivery.entities.Reservation;
import hu.elte.Food_delivery.repositories.ProductRepository;
import hu.elte.Food_delivery.repositories.ReservationRepository;
import java.util.ArrayList;
import java.util.List;
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
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Iterable<Reservation>> getAll(){
        Iterable<Reservation> reservations = reservationRepository.findAll();
        return ResponseEntity.ok(reservations);
    }
    
    @PostMapping("")
    public ResponseEntity<Reservation> post(@RequestBody Reservation reservation){
        reservation.setId(null);
       return ResponseEntity.ok(reservationRepository.save(reservation));
    }
    
    @GetMapping("/{id}")
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
    
    @PutMapping("/{id}/products")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Iterable<Product>> addProductsToReservation(@PathVariable Integer id, 
                                                                        @RequestBody List<Product> products){
        Optional<Reservation> oReservation = reservationRepository.findById(id);
        if(!oReservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        List<Product> newProductList = new ArrayList<>();
        newProductList = oReservation.get().getProducts();
        for(Product product: products){
            Optional<Product> oProduct = productRepository.findById(product.getId());
            if(!oProduct.isPresent()){
                continue;
            }
            newProductList.add(product);
        }
        oReservation.get().setProducts(newProductList);
        reservationRepository.save(oReservation.get());
        return ResponseEntity.ok(oReservation.get().getProducts());
    }
    
}
