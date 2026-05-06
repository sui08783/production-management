package com.sui.production_management.controller;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ユーザーがログインしているかどうかを判別するためのコントローラー
 */

@RestController
public class AuthController {


  /**
   * 現在のログイン状態を確認するためのAPI
   *
   * @param auth ログインしているユーザー情報
   * @return 404 未ログイン
   *         200 ログイン済み
   */

  @GetMapping("/api/me")
  public ResponseEntity<?> me(Authentication auth){

    if (auth == null){
      return ResponseEntity.status(401).build();
    }
    return ResponseEntity.ok(auth.getName());
  }
}
