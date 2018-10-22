/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import selenium.*;
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
public class TestCity {
    
    private String nameCity;
    private City city;
    private WebDriver driver;
    private WebDriverWait driverWait;
 
    public TestCity() {
    }    
    
    public void addEditRemove() throws Exception
    {
        addCity();
        editCity();
        removeCity();
    }
    public void addSearchRemove() throws Exception
    {
        addCity();
        searchCity();
        removeCity();
    }
    public void addSearchRemoveGoBackAddEditRemove() throws Exception
    {
        addSearchRemove();
        city.search("");
        Helper.sleepForSeconds(2);
        addEditRemove();
        
    }
    @Test
    public void addEmpyCity() throws Exception
    {
        city.adiciona("");
        assertTrue(!city.exist(""));
    }
    @Test
    public void addEditRemoveChangePageSize() throws Exception
    {
        addEditRemove();
        changepageSize(10);
        changepageSize(5);
    }
    @Test
    public void addSearchRemoveGoBackAddEditRemoveChangePage() throws Exception
    {
        addSearchRemoveGoBackAddEditRemove();
        changepageSize(10);
        changepageSize(5);
    }
    public void changepageSize(int size)
    {
        city.chanceSize(size);
        Helper.sleepForSeconds(2);
        assertTrue(size == city.getTableSize());
    }
    public void addCity() throws Exception
    {
        city.adiciona(nameCity);
         Helper.sleepForSeconds(2);
        assertTrue(city.exist(nameCity));
    }
    public void editCity() throws Exception
    {
        this.nameCity= "____"+Math.random()*100000;
        city.edit(nameCity,0);
        Helper.sleepForSeconds(2);
        assertTrue(city.exist(nameCity));
    }
    
    @Test
    public void testPagination()
    {
        city.testPagination();
    }
    
    public void removeCity() throws Exception
    {
        city.remove(0);
        Helper.sleepForSeconds(2);
        assertTrue(!city.exist(nameCity));
    }
    public void searchCity()
    {
        city.search(nameCity);
        Helper.sleepForSeconds(2);
        assertTrue(city.exist(nameCity));
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
        this.driverWait = new WebDriverWait(driver,20);
        
    }
    
    @After
    public void close()
    {
        this.driver.close();
    }
    
}
