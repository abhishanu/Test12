package abhi.game.cric.MyCricket.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import abhi.game.cric.MyCricket.entity.Login;
import abhi.game.cric.MyCricket.entity.PlayerDetails;
import abhi.game.cric.MyCricket.repo.LoginRepo;
import abhi.game.cric.MyCricket.repo.PlayerDetailsRepo;
import abhi.game.cric.MyCricket.util.Response;

@Service
public class DataService {

	@Autowired
	private PlayerDetailsRepo playerDetailsRepo;

	@Autowired
	private LoginRepo loginrepo;

	private RestTemplate restTemplate = new RestTemplate();

	public String apiKey = "bntzTzZ22SUW8oEgs0dyLZTJuAv1";

	public String url = "https://cricapi.com/api/";

	private final String playerApi = url + "playerStats?apikey=" + apiKey + "&pid=";

	private static Object allMatches = null;

	public Object getAllMatches() {
		Map<String, String> map = new HashMap<>();
		try {
			if (allMatches == null) {
				RestTemplate restTemplate = new RestTemplate();

				allMatches = restTemplate.getForObject(url + "matches?apikey=bntzTzZ22SUW8oEgs0dyLZTJuAv1",
						Object.class);
			}

		} catch (Exception e) {
			System.err.println(e.getMessage());
		} finally {
			return allMatches;
		}
	}

	public Response signUp(Map<String, Object> request) {
		Response response = new Response();
		response.setState(false);
		try {
			if (request != null) {

				Login login = new Login();
				String name = (String) request.get("name");
				String pwd = (String) request.get("pwd");

				login.setName(name);
				login.setPwd(pwd);

				Login saveUser = loginrepo.save(login);

				response.setState(saveUser != null ? true : false);
				Map<String, Object> responseMap = new HashMap<>(1);
				responseMap.put("id", saveUser.getId());
				response.setResponseMap(responseMap);

			}
		} catch (Exception e) {
			System.err.println("Error:" + e.getMessage());
		} finally {
			return response;
		}

	}

	public Response login(Map<String, Object> request) {
		Response response = new Response();
		response.setState(false);
		try {
			if (request != null) {
				String name = (String) request.get("name");
				String pwd = (String) request.get("pwd");

				Optional<Login> matchedLogin = loginrepo.findByName(name).stream()
						.filter(login -> login.getPwd().equals(pwd)).findFirst();

				if (matchedLogin.isPresent()) {
					Map<String, Object> responseMap = new HashMap<>(1);
					response.setState(true);
					responseMap.put("userId", matchedLogin.get().getId());
					response.setResponseMap(responseMap);
				}
			}
		} catch (Exception e) {
			System.err.println("Error:" + e.getMessage());
		} finally {
			return response;
		}
	}

	@Scheduled(cron = "	0 45 0 1/1 * ?")
	public void cronJobSch() {
		allMatches = null;
	}

	@Transactional
	public Response savePin(Map<String, Object> request) {
		Response response = new Response();
		response.setState(false);
		try {
			if (request != null) {
				Integer userId = (Integer) request.get("User_Id");

				String generatedPin = (String) request.get("Pin");

				if (generatedPin.length() == 5) {

					Optional<Login> user = loginrepo.findById(userId);

					if (user.isPresent()) {
						Login userlogin = user.get();

						userlogin.setPin(new Long(generatedPin));

						if (loginrepo.save(userlogin) != null) {
							response.setState(true);
						}

					}
				}
			}
		} catch (Exception e) {
			System.err.println("Error:" + e);
		} finally {
			return response;
		}
	}

	public Response getAppPin(Integer userId) {
		Response response = new Response();
		response.setState(false);
		try {
			Optional<Login> user = loginrepo.findById(userId);

			if (user.isPresent()) {
				Map<String, Object> responseMap = new HashMap<>(1);
				responseMap.put("Pin", user.get().getPin());
				response.setResponseMap(responseMap);
				response.setState(true);
			}
		} catch (Exception e) {
			System.err.println("Erroe:" + e.getMessage());
		} finally {
			return response;
		}

	}

	public Response getPlayerList(String matchId) {
		Response response = new Response();

		response.setState(false);

		try {
			String playersApi = url + "fantasySquad?apikey=" + apiKey + "&unique_id=" + 1175368;

			JsonParser jsonParser = new JsonParser();

			String allPlayersList = restTemplate.getForObject(playersApi, String.class);

			JsonObject playerJsonObject = (JsonObject) jsonParser.parse(allPlayersList);

			JsonArray teamPlayersArray = (JsonArray) playerJsonObject.get("squad");

			Map<String, Object> map = new HashMap<>();

			for (JsonElement teamPlayersJson : teamPlayersArray) {

				JsonObject teamPlayersJsonObject = teamPlayersJson.getAsJsonObject();

//				map.put("Team_1", teamPlayersJsonObject.get("name"));
//				map.put("Team_Name", teamPlayersJsonObject.get("name"));

				JsonArray firstTeamJsonArray = (JsonArray) teamPlayersJsonObject.get("players");
				// map.put("Total_Players", firstTeamJsonArray.size());

				List<PlayerDetails> playerList = new ArrayList<>();
				for (JsonElement playerJson : firstTeamJsonArray) {
					PlayerDetails playerData = setPlayerData(playerJson);
					playerList.add(playerData);
				}

				map.put("Players_List", playerList);

				response.setResponseMap(map);
			}
		} catch (Exception e) {
			System.err.println("Error:" + e.getMessage());
		} finally {
			return response;
		}
	}

	public PlayerDetails setPlayerData(JsonElement playerJson) {
		PlayerDetails playerDetails = new PlayerDetails();

		JsonObject playerObject = playerJson.getAsJsonObject();

		JsonElement pid = playerObject.get("pid");

		PlayerDetails hasPlayerDetails = playerDetailsRepo.findByPlayerId(new Long(pid.getAsString()));

		boolean ispresent = hasPlayerDetails != null;

		if (!ispresent) {
			try {

				JsonParser jsonParser = new JsonParser();

				String playerProfile = url + "playerStats?apikey=" + apiKey + "&pid=" + pid.getAsString();

				String playerData = restTemplate.getForObject(playerProfile, String.class);

				JsonObject playerDataJson = (JsonObject) jsonParser.parse(playerData);

				JsonElement country = null;
				JsonElement imageUrl = null;
				JsonElement playingRole = null;
				if (playerDataJson != null) {
					country = playerDataJson.get("country");

					imageUrl = playerDataJson.get("imageURL");

					playingRole = playerDataJson.get("playingRole");
				}

//				playerObject.add("country", country);
				//
//				playerObject.add("imageURL", imageUrl);
				//
//				playerObject.add("playingRole", playingRole);

				playerDetails.setPlayerid(new Long(pid.getAsString()));

				playerDetails.setName(playerObject.get("name").getAsString());

				if (country != null) {
					playerDetails.setCountry(country.getAsString());
				}

				if (imageUrl != null) {
					playerDetails.setImageUrl(imageUrl.getAsString());
				}

				if (playingRole != null) {
					playerDetails.setPlayingRole(playingRole.getAsString());
				}

				boolean playerSaved = playerDetailsRepo.save(playerDetails) != null;

			} catch (Exception e) {
				System.err.println("Error:" + e.getMessage());
			}
		} else {
			playerDetails = hasPlayerDetails;
		}

		return playerDetails;
	}

	public Response forgetPwd(Map<String, Object> request) {
		Response response = new Response();
		response.setState(false);
		try {
			if (request != null) {
				String userName = (String) request.get("userName");

				List<Login> usersListByName = loginrepo.findByName(userName);

				if (usersListByName != null) {
					if (usersListByName.size() == 1) {
						Login userByName = usersListByName.get(0);

						userByName.setPwd((String) request.get("pwd"));

						boolean isSaved = (loginrepo.save(userByName) != null);

						response.setState(true);
					} else {

					}
				}
			}
		} catch (Exception e) {
			System.err.println("Error in forgetPwd:" + e.getMessage());
		} finally {
			return response;
		}

	}
}
