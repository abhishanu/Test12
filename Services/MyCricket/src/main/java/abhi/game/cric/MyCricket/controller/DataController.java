package abhi.game.cric.MyCricket.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import abhi.game.cric.MyCricket.service.DataService;
import abhi.game.cric.MyCricket.service.PlayerService;
import abhi.game.cric.MyCricket.util.Response;

@RestController
@CrossOrigin
public class DataController {

	@Autowired
	private DataService dataservice;
	
	@Autowired
	private PlayerService playerService;

	@GetMapping("/getMatches")
	public Object getMatches() {
		return dataservice.getAllMatches();
	}

	@PostMapping("/signUp")
	public ResponseEntity<Response> signUp(@RequestBody Map<String, Object> request) {
		Response response = dataservice.signUp(request);
		return new ResponseEntity<Response>(response,
				response.getState() ? HttpStatus.ACCEPTED : HttpStatus.BAD_GATEWAY);
	}

	@PostMapping("/login")
	public ResponseEntity<Response> login(@RequestBody Map<String, Object> request) {
		Response response = dataservice.login(request);
		return new ResponseEntity<Response>(response, response.getState() ? HttpStatus.OK : HttpStatus.FORBIDDEN);
	}

	@PostMapping("/savePin")
	public ResponseEntity<Response> savePin(@RequestBody Map<String, Object> request) {
		Response response = dataservice.savePin(request);
		return new ResponseEntity<Response>(response, response.getState() ? HttpStatus.OK : HttpStatus.FORBIDDEN);
	}

	@GetMapping("/getAppPin/{userId}")
	public ResponseEntity<Response> getAppPin(@PathVariable("userId") Integer userId) {
		Response response = dataservice.getAppPin(userId);
		return new ResponseEntity<Response>(response, response.getState() ? HttpStatus.OK : HttpStatus.FORBIDDEN);
	}

	@GetMapping("/getPlayerList/{matchId}")
	public ResponseEntity<Response> getAppPin(@PathVariable("matchId") String matchId) {
		Response response = dataservice.getPlayerList(matchId);
		return new ResponseEntity<Response>(response, response.getState() ? HttpStatus.OK : HttpStatus.FORBIDDEN);
	}

	@PostMapping("/forgetPwd")
	public ResponseEntity<Response> forgetPwd(@RequestBody Map<String, Object> request) {
		Response response = dataservice.forgetPwd(request);
		return new ResponseEntity<Response>(response, response.getState() ? HttpStatus.OK : HttpStatus.FORBIDDEN);
	}

	@GetMapping("/getPlayersOfTeam/{teamName}")
	public ResponseEntity<Response> getPlayersOfTeam(@PathVariable("teamName") String teamName) {
		Response response = playerService.getPlayersOfTeam(teamName);
		return new ResponseEntity<Response>(response, response.getState() ? HttpStatus.OK : HttpStatus.FORBIDDEN);
	}
}
