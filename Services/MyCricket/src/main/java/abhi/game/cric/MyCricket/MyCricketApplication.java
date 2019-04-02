package abhi.game.cric.MyCricket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MyCricketApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyCricketApplication.class, args);
	}

}
