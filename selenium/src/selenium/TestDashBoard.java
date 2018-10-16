/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author vinicius
 */
public class TestDashBoard {
    public void run(WebDriver driver)
    {
        WebElement element;
        element = driver.findElement(By.cssSelector("tbody"));
        List<WebElement> tbody =  element.findElements(By.tagName("tr"));
        System.out.println("Size:"+tbody.size());
        
        element = driver.findElement(By.cssSelector("select"));
        element.sendKeys("10");
        
        try{
             Thread.sleep(8*1000);
         }catch(InterruptedException e)
         {
             System.out.println("Erro ao tentar esperar");
         }
        element = driver.findElement(By.cssSelector("tbody"));
        tbody =  element.findElements(By.tagName("tr"));
        System.out.println("Size:"+tbody.size());
        
        element = driver.findElement(By.className("pagination"));
        List<WebElement> pagination= driver.findElements(By.tagName("li"));
        element = pagination.get(pagination.size() - 1);
        element.click();
        try{
             Thread.sleep(8*1000);
         }catch(InterruptedException e)
         {
             System.out.println("Erro ao tentar esperar");
         }
    }
}
