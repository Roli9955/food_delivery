package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Product;
import hu.elte.Food_delivery.entities.Reservation;
import hu.elte.Food_delivery.repositories.ProductRepository;
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
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Product>> getAll(){
        Iterable<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }
    
    @PostMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Product> post(@RequestBody Product product){
        product.setId(null);
       return ResponseEntity.ok(productRepository.save(product));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable Integer id){
        Optional<Product> oProduct = productRepository.findById(id);
        if(!oProduct.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oProduct.get());
    }
    
    @DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity delete(@PathVariable Integer id){
        Optional<Product> oProduct = productRepository.findById(id);
        if(!oProduct.isPresent()){
            return ResponseEntity.notFound().build();
        }
        productRepository.delete(oProduct.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Product> put(@PathVariable Integer id, 
                                        @RequestBody Product product){
        Optional<Product> oProduct = productRepository.findById(id);
        if(!oProduct.isPresent()){
            return ResponseEntity.notFound().build();
        }
        product.setId(id);
        return ResponseEntity.ok(productRepository.save(product));
    }
    
    @GetMapping("/{id}/reservation")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Iterable<Reservation>> getProductReservations(@PathVariable Integer id){
        Optional<Product> oProduct = productRepository.findById(id);
        if(!oProduct.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oProduct.get().getReservations());
    }
}
