package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Category;
import hu.elte.Food_delivery.entities.Product;
import hu.elte.Food_delivery.repositories.CategoryRepository;
import hu.elte.Food_delivery.repositories.PieceRepository;
import hu.elte.Food_delivery.repositories.ProductRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private PieceRepository pieceRepository;
    
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
    
    /*@DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity delete(@PathVariable Integer id){
        Optional<Product> oProduct = productRepository.findById(id);
        if(!oProduct.isPresent()){
            return ResponseEntity.notFound().build();
        }
        productRepository.delete(oProduct.get());
        return ResponseEntity.ok().build();
    }*/
    
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
    
    @PutMapping("/{id}/category/{id2}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Product> changeCategory(@PathVariable("id") Integer productId, @PathVariable("id2") Integer categoryId){
        Optional<Product> oProduct = productRepository.findById(productId);
        if(!oProduct.isPresent()){
            return ResponseEntity.notFound().build();
        }
        
        Optional<Category> oCategory = categoryRepository.findById(categoryId);
        if(!oCategory.isPresent()){
            return ResponseEntity.notFound().build();
        }
        
        oProduct.get().setCategory(oCategory.get());
        return ResponseEntity.ok(productRepository.save(oProduct.get()));
    }
}
