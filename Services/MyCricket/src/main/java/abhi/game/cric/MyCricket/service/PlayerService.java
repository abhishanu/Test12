package abhi.game.cric.MyCricket.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import abhi.game.cric.MyCricket.entity.PlayerDetails;
import abhi.game.cric.MyCricket.repo.PlayerDetailsRepo;
import abhi.game.cric.MyCricket.util.Response;

@Service
public class PlayerService {

	@Autowired
	private PlayerDetailsRepo playerDetailsRepo;

	public Response getPlayersOfTeam(String teamName) {
		Response response = new Response();
		response.setState(false);

		try {
			List<PlayerDetails> playersListInTeam = playerDetailsRepo.findByIplTeamLike(teamName);

			if (playersListInTeam != null) {
				Map<String, Object> playersMap = new HashMap<String, Object>(1);

				playersMap.put("PlayersMap", playersListInTeam);

				response.setState(true);
				response.setResponseMap(playersMap);
				response.setMsg("Success");

			} else {
				response.setMsg("No players found for team:" + teamName);
			}
		} catch (Exception e) {
			System.err.println("Error in PlayerService:" + e.getMessage() + "For teamName:" + teamName);
			response.setMsg("Error while fetching records...");
		} finally {
			return response;
		}
	}

}
