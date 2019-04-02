package abhi.game.cric.MyCricket.util;

import java.util.Map;

public class Response {
	private boolean state;
	private Map<String, Object> responseMap;
	private String msg;

	public boolean getState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}

	public Map<String, Object> getResponseMap() {
		return responseMap;
	}

	public void setResponseMap(Map<String, Object> responseMap) {
		this.responseMap = responseMap;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}
