package abhi.game.cric.MyCricket.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import abhi.game.cric.MyCricket.entity.Login;

@Repository
public interface LoginRepo extends CrudRepository<Login, Integer> {
	List<Login> findByName(String name);
}
