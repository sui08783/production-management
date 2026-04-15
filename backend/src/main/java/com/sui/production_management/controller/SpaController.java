package com.sui.production_management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * SPAの画面遷移を制御するためのControllerクラス
 *
 */

@Controller
public class SpaController {

  /**
   *
   * @return index.htmlを返して、その後の画面遷移先はReactへ任せる
   */

  @GetMapping("/{path:[^\\.]*}") //ドットを含まない文字列(URL)だけ受け取る
  public String forward(){
    return "forward:/index.html";
  }
}
