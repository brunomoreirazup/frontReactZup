/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author vinicius
 */
public class Customer {
    private WebDriver driver;
    private Dashboard dashboard;
    public Customer(WebDriver driver) {
        this.driver = driver;
        this.dashboard = new Dashboard(driver);
    }
    
    public void adiciona(String customerName,String cityName) throws Exception
    {
        
        dashboard.showModalAdd();
        
        WebElement element;
        element = driver.findElement(By.cssSelector("#input_customer_name"));
        element.sendKeys(customerName);
        
        element = driver.findElement(By.cssSelector("#states-autocomplete"));
        element.sendKeys(cityName);
       
        Helper.sleepForSeconds(1);
        
        element.sendKeys(Keys.ENTER);
        
        
        element = driver.findElement(By.cssSelector("#input_customer_name"));
        element.submit();
        
        

        
    }
    public void remove(int index) throws Exception
    {
        dashboard.removeItem(index);
        
    }
    public void edit(String customerName,String cityName, int index) throws Exception
    {
        dashboard.showModalEdit(index);
        
        WebElement element;
        element = driver.findElement(By.cssSelector("#input_customer_name"));
        element.clear();
        element.sendKeys(customerName);
        
        element = driver.findElement(By.cssSelector("#states-autocomplete"));
        element.clear();
        
        Helper.sleepForSeconds(1);
        
        element.sendKeys(cityName);
       
        Helper.sleepForSeconds(1);
        
        element.sendKeys(Keys.ENTER);
        
        element = driver.findElement(By.cssSelector("#input_customer_name"));
        element.submit();
        
        
        
    }
    public boolean exist(String customerName,String cityName)
    {
        return dashboard.columExistName(1, customerName) && dashboard.columExistName(2, cityName);
    }
    
    public void search(String name)
    {
        dashboard.search(name);
    }
    
    public void chanceSize(int size)
    {
        dashboard.changePageSize(size);
    }
    public int getTableSize()
    {
        return dashboard.getTableSize();
    }
    public boolean testPagination()
    {
        int homePageHash=dashboard.getTableHash();
        int nextPageHash;
        int currentPageHash;
        System.out.println("hash:"+homePageHash);
        
        dashboard.nextPage(1);
        Helper.sleepForSeconds(2);
        nextPageHash=dashboard.getTableHash();
        System.out.println("hash:"+nextPageHash);
        
        dashboard.prevPage(1);
        Helper.sleepForSeconds(2);        
        currentPageHash=dashboard.getTableHash();
        System.out.println("hash>:"+currentPageHash);
        
        return homePageHash == currentPageHash;
          
    }
    public Dashboard getDashboard()
    {
        return this.dashboard;
    }
    
}
