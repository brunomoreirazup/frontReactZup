/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package selenium;

import static com.google.common.collect.Multimaps.index;
import java.util.List;
import jdk.internal.util.xml.impl.Input;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 *
 * @author vinicius
 */
public class Dashboard {
    private WebDriver driver;
    
    public Dashboard(WebDriver driver) {
        this.driver = driver;
    }
    
    public void showModalAdd()
    {
        Helper.sleepForSeconds(2);
        WebElement element = driver.findElement(By.cssSelector("#btAdd"));
        element.click();
        
    }
    public void showModalEdit(int index)
    {
        Helper.sleepForSeconds(2);
        WebElement element = driver.findElements(By.cssSelector(".bt-edit")).get(index);
        element.click();
        
    }
    public void hideModal()
    {
        Helper.sleepForSeconds(2);
        WebElement element;
        element = driver.findElement(By.cssSelector("#btClosseModal"));
        element.click();
        
    }  
    
    public void removeItem(int index) throws Exception
    {
       
        Helper.sleepForSeconds(2);
        WebElement element = driver.findElements(By.cssSelector(".bt-delete")).get(index);
        element.click();        
        
        Helper.sleepForSeconds(2);
        element = driver.findElement(By.cssSelector("#btDeleteModal"));
        element.click();

        
        
        
        
    }    
    public void search(String name)
    {
        Helper.sleepForSeconds(2);
        WebElement element = driver.findElement(By.cssSelector("#input_search_city_name"));
        element.clear();
        element.sendKeys(name);
        element.submit();
    }
    public boolean columExistName(int colum , String name)
    {
        WebElement element ;
        
        element = driver.findElement(By.cssSelector("tbody"));
        List<WebElement> tableRows = element.findElements(By.cssSelector("tr"));
        for(WebElement row : tableRows)
        {
            List<WebElement> colums  = row.findElements(By.cssSelector("td"));
            for(int j = 0 ; j<colums.size() ; j++)
            {
                if(j == colum)
                    if(name.equals(colums.get(j).getText()))
                        return true;
                    
            }
        }
        return false;
    }
    
            
}
