/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 *
 * @author vinicius
 */
public class TestCity2 {
    
    private String nameCity;
    private City city;
    private WebDriver driver;
    
//    public void run() throws Exception
//    {
//          
//        City c = new City(driver);
//        c.adiciona(nameCity);
//        System.out.println("Adicionou na table:"+c.exist(nameCity));
//        nameCity = "____"+Math.random()*100000;
//        c.edit(nameCity, 0);
//        c.remove(0);
// 
//    }
    
    public TestCity2() {
    }    
    
    
    @Test
    public void addCity() throws Exception
    {
        city.adiciona(nameCity);
        assertTrue(city.exist(nameCity));
    }
    @Test
    public void editCity() throws Exception
    {
        this.nameCity= "____"+Math.random()*100000;
        city.edit(nameCity,0);
        assertTrue(city.exist(nameCity));
    }
    
    @Test
    public void removeCity() throws Exception
    {
        city.remove(0);
        assertTrue(!city.exist(nameCity));
    }
   
    @Before
    public void init()
    {
        
        
        
        System.setProperty("webdriver.chrome.driver", "/home/vinicius/Documentos/frontReactZup/selenium/src/selenium/libs/webdrivers/chromedriver");
        
        ChromeDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/cidades");
        Boolean temUsuario =
				new WebDriverWait(driver, 10)
				.until(ExpectedConditions
						.textToBePresentInElement(By.cssSelector("tbody"), "1"));
        this.driver = driver;
        this.city = new City(driver);
        this.nameCity= "____"+Math.random()*100000;
        
    }
    
    @After
    public void close()
    {
        this.driver.close();
    }
    
}
