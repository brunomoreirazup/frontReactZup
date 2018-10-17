/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author vinicius
 */
public class TestCity {
    
    private String nameCity = "____"+Math.random()*100000;
    
    public void run()
    {
        WebDriver driver = init();
        TestDashBoard t = new TestDashBoard();
        t.run(driver);
        driver.quit();
        return;
        addCity(driver);
        System.out.println("AddCity:"+verifyAddCity(driver));
        
        EditCity(driver);
        System.out.println("EditCity:"+verifyAddCity(driver));
        
        DeleteCity(driver);
        System.out.println("DeletCity:"+!verifyAddCity(driver));
        
        addCity(driver);
        searchCity(driver);
        System.out.println("SearchAddCity:"+verifyAddCity(driver));
        
        EditCity(driver);
        searchCity(driver);
        System.out.println("SearchEditCity:"+verifyAddCity(driver));
        
        DeleteCity(driver);
        System.out.println("SearchDeletCity:"+!verifyAddCity(driver));
        
        this.nameCity="";
        searchCity(driver);
        
        this.nameCity = "____"+Math.random()*100000;
        
        addCity(driver);
        System.out.println("AddCity:"+verifyAddCity(driver));
        
        EditCity(driver);
        System.out.println("EditCity:"+verifyAddCity(driver));
        
        DeleteCity(driver);
        System.out.println("DeletCity:"+!verifyAddCity(driver));
    }
    public void addCity(WebDriver driver)
    {
         WebElement element;
         
         element = driver.findElement(By.cssSelector("#btAdd"));
         element.click();
         
         element = driver.findElement(By.cssSelector("#input_cidade_name"));
         element.sendKeys(this.nameCity);
         
         element = driver.findElement(By.cssSelector("#btAddModal"));
         element.click();
         
         element = driver.findElement(By.cssSelector("#btClosseModal"));
         element.click();
         
         try{
             Thread.sleep(3*1000);
         }catch(Exception e)
         {
             System.out.println("Erro ao tentar esperar");
         }
    }
    public void searchCity(WebDriver driver)
    {
         WebElement element;
         
         element = driver.findElement(By.cssSelector("#input_search_city_name"));
         element.clear();
         element.sendKeys(this.nameCity);
         
         element = driver.findElement(By.cssSelector("#submit_search_city_name"));
         element.click();
         try{
             Thread.sleep(3*1000);
         }catch(Exception e)
         {
             System.out.println("Erro ao tentar esperar");
         }
    }
    public void DeleteCity(WebDriver driver)
    {
        WebElement element;
         
        element = driver.findElement(By.cssSelector("#btDelete"));
        element.click();

         
        element = driver.findElement(By.cssSelector("#btDeleteModal"));
        element.click();
         
         try{
             Thread.sleep(3*1000);
         }catch(Exception e)
         {
             System.out.println("Erro ao tentar esperar");
         }
         
        
    }
    public void EditCity(WebDriver driver)
    {
        WebElement element;
         
        element = driver.findElement(By.cssSelector("#btEdit"));
        element.click();

        this.nameCity = "____"+Math.random()*100000;
        
        element = driver.findElement(By.cssSelector("#input_cidade_name"));
        element.clear();
        element.sendKeys(this.nameCity); 
        
        element = driver.findElement(By.cssSelector("#btEditModal"));
        element.click();
         
         try{
             Thread.sleep(3*1000);
         }catch(Exception e)
         {
             System.out.println("Erro ao tentar esperar");
         }
         
        
    }
    public boolean verifyAddCity(WebDriver driver)
    {
         WebElement element;
         
         element = driver.findElement(By.cssSelector("table tbody"));
        for(WebElement e  : element.findElements(By.cssSelector("td")))
        {
            if(e.getText().equals(this.nameCity))
            {
                return true;
            }
        }
        return false;
        
    }
    public WebDriver init()
    {
        System.setProperty("webdriver.chrome.driver", "/home/vinicius/Downloads/selenium/selenium/src/selenium/libs/webdrivers/chromedriver");
        
        ChromeDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/cidades");
        try{
             Thread.sleep(8*1000);
         }catch(Exception e)
         {
             System.out.println("Erro ao tentar esperar");
         }
        return driver;
        
    }
    
}