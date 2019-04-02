package abhi.game.cric.MyCricket.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "player_detail")
public class PlayerDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "player_id")
	private Long playerId;

	@Column(name = "name")
	private String name;

	private String country;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "playing_role")
	private String playingRole;

	@Column(name = "Ipl_team")
	private String iplTeam;

	public Long getPlayerid() {
		return playerId;
	}

	public void setPlayerid(Long pid) {
		this.playerId = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getPlayingRole() {
		return playingRole;
	}

	public void setPlayingRole(String playingRole) {
		this.playingRole = playingRole;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIplTeam() {
		return iplTeam;
	}

	public void setIplTeam(String iplTeam) {
		this.iplTeam = iplTeam;
	}
}
