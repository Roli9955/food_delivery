package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Category;
import hu.elte.Food_delivery.repositories.CategoryRepository;
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
@RequestMapping("/category")
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Category>> getAll(){
        Iterable<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }
    
    @PostMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Category> post(@RequestBody Category category){
        category.setId(null);
       return ResponseEntity.ok(categoryRepository.save(category));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Category> get(@PathVariable Integer id){
        Optional<Category> oCategory = categoryRepository.findById(id);
        if(!oCategory.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oCategory.get());
    }
    
    @DeleteMapping("/{id}")    
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity delete(@PathVariable Integer id){
        Optional<Category> oCategory = categoryRepository.findById(id);
        if(!oCategory.isPresent()){
            return ResponseEntity.notFound().build();
        }
        categoryRepository.delete(oCategory.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Category> put(@PathVariable Integer id, 
                                        @RequestBody Category category){
        Optional<Category> oCategory = categoryRepository.findById(id);
        if(!oCategory.isPresent()){
            return ResponseEntity.notFound().build();
        }
        category.setId(id);
        return ResponseEntity.ok(categoryRepository.save(category));
    }
    
}
