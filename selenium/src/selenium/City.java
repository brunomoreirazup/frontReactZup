/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 *
 * @author vinicius
 */
public class City {

    private WebDriver driver;
    private Dashboard dashboard;
    public City(WebDriver driver) {
        this.driver = driver;
        this.dashboard = new Dashboard(driver);
    }
    
    public void adiciona(String cityName) throws Exception
    {
        
        dashboard.showModalAdd();
        
        WebElement element;
        element = driver.findElement(By.cssSelector("#input_cidade_name"));
        element.sendKeys(cityName);
        element.submit();
                
        dashboard.hideModal();
        
    }
    public void remove(int index) throws Exception
    {
        dashboard.removeItem(index);
        
    }
    public void edit(String cityName, int index) throws Exception
    {
        dashboard.showModalEdit(index);
        
        WebElement element;
        element = driver.findElement(By.cssSelector("#input_cidade_name"));
        element.clear();
        element.sendKeys(cityName);
        element.submit();
        
        
        
    }
    public boolean exist(String text)
    {
        return dashboard.columExistName(1, text);
    }
    
    public void search(String name)
    {
        dashboard.search(name);
    }
    

    
    
}
