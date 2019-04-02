package abhi.game.cric.MyCricket.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import abhi.game.cric.MyCricket.entity.PlayerDetails;

public interface PlayerDetailsRepo extends CrudRepository<PlayerDetails, Long> {

	PlayerDetails findByPlayerId(Long playerId);

	/*
	 * public String
	 * Get_Team_Players_Details="Select count(*) from player_detail where Ipl_team LIKE('%RR%')"
	 * ;
	 * 
	 * @Query(value = Get_City_For_Pincode, nativeQuery = true)
	 */
	public List<PlayerDetails> findByIplTeamLike(String teamName);

}
