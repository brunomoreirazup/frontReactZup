/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

/**
 *
 * @author vinicius
 */
public class Helper {
    public static void sleepForSeconds(int seconds)
    {
        try {
            Thread.sleep(seconds*1000);
        } catch (Exception e) {
            System.out.println("Erro no sleep");
        }
    }
}
