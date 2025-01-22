package com.first.project.user_management_system.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsername(String username);

    Page<User> findByRoleIgnoreCase(String role, Pageable pageable);
    Page<User> findByCountryIgnoreCase(String country, Pageable pageable);
    Page<User> findByRoleAndCountryIgnoreCase(String role, String country, Pageable pageable);
    Page<User> findByFirstNameIgnoreCaseStartsWithOrLastNameIgnoreCaseStartsWith(
            String firstName, String lastName, Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.id = :id") // Custom query for id search
    Page<User> findById(@Param("id") int id, Pageable pageable);
    @Query("SELECT DISTINCT u.country FROM User u")
    List<String> findDistinctCountries();
}
