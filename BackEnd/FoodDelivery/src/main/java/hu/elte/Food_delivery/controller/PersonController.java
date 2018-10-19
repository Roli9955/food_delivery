package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Person;
import hu.elte.Food_delivery.repositories.PersonRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/person")
public class PersonController {
    
    @Autowired
    private PersonRepository personRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Person>> getAll(){
        Iterable<Person> persons = personRepository.findAll();
        return ResponseEntity.ok(persons);
    }
    
    @PostMapping("")
    public ResponseEntity<Person> post(@RequestBody Person person){
        person.setId(null);
       return ResponseEntity.ok(personRepository.save(person));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Person> get(@PathVariable Integer id){
        Optional<Person> oPerson = personRepository.findById(id);
        if(!oPerson.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oPerson.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        Optional<Person> oPerson = personRepository.findById(id);
        if(!oPerson.isPresent()){
            return ResponseEntity.notFound().build();
        }
        personRepository.delete(oPerson.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Person> put(@PathVariable Integer id, 
                                        @RequestBody Person person){
        Optional<Person> oPerson = personRepository.findById(id);
        if(!oPerson.isPresent()){
            return ResponseEntity.notFound().build();
        }
        person.setId(id);
        return ResponseEntity.ok(personRepository.save(person));
    }
    
}
