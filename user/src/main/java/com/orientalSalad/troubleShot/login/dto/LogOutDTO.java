package com.orientalSalad.troubleShot.login.dto;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Getter
@Setter
@Builder
@Log4j2
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LogOutDTO implements Serializable {
	@Schema(description = "유저 pk")
	Long seq;
	@Schema(description = "ip",hidden = true)
	String ip;
	@Schema(description = "로그인할 기기 0 : 웹, 1 : 인텔리제이, 2: vscode, 3: 크롬 확장")
	Long type;
}
