package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Category;
import hu.elte.Food_delivery.repositories.CategoryRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Category>> getAll(){
        Iterable<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }
    
    @PostMapping("")
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
    
}
