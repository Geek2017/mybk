package GooglePageInsight_API;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import java.sql.*;
 
class T implements Runnable
{
    private static Connection con = null;
    private static Statement stmt = null;
    private static ResultSet rs = null;
    
   Thread mythread ;
   T()
   { 
      mythread = new Thread(this, "my runnable thread");
      System.out.println("my thread created" + mythread);
      mythread.start();
   }
   public void run()
   {
      try
      {
        for (int i=1 ;i<4;i++)
        {
            
         String result = "";
         
        try {
            URL url_api = new URL("https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=https://"+url(i)+"&key=AIzaSyCPFRwvYYi5ASk2g9-RMIztcYSUMo2q_Gc&strategy=mobile");
 
            HttpURLConnection httpURLConnection = (HttpURLConnection) url_api.openConnection();
 
            if (httpURLConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
 
                InputStreamReader inputStreamReader =
                    new InputStreamReader(httpURLConnection.getInputStream());
                BufferedReader bufferedReader =
                    new BufferedReader(inputStreamReader, 8192);
                String line = null;
                while((line = bufferedReader.readLine()) != null){
                    result += line;
                }
                 
                bufferedReader.close();
                 
                String weatherResult = ParseResult(result);
                 
                System.out.println(weatherResult);
 
            } else {
                System.out.println("Error in httpURLConnection.getResponseCode()!!!");
            }
 
        } catch (MalformedURLException ex) {
            Logger.getLogger(GooglePageInsight_API.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(GooglePageInsight_API.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JSONException ex) {
            Logger.getLogger(GooglePageInsight_API.class.getName()).log(Level.SEVERE, null, ex);
        }
        
          Thread.sleep(1000);
        }
     }
     catch(InterruptedException e)
     {
        System.out.println("my thread interrupted");
     }
     System.out.println("mythread run is over" );
   }
 
   static private String url(int id)
    {
        String url = null;
 
        try
          {  
            con = ConnectionManager.getConnection();
            stmt = con.createStatement();
            rs = stmt.executeQuery("select * from urllist WHERE id='"+id+"'");

            while(rs.next())  
            url = rs.getString(2);
            con.close();  
          }
          catch(Exception e)
          { 
              System.out.println(e);
          }  
        
       
        return url;
    }
    
    static private String ParseResult(String json) throws JSONException{
         
       
        JSONObject jsonObject = new JSONObject(json);
 
      
       JSONObject JSONObject_rg = jsonObject.getJSONObject("ruleGroups");
       JSONObject JSONObject_sc0 = JSONObject_rg.getJSONObject("SPEED");
       int result_score0  = JSONObject_sc0.getInt("score");
       String string_result_score0 = Integer.toString(result_score0);
       
       String result_title = jsonObject.getString("title");
       String result_id = jsonObject.getString("id");
       
       JSONObject JSONObject_sc1 = JSONObject_rg.getJSONObject("USABILITY");
          int result_score1 = JSONObject_sc1.getInt("score");
          String string_result_score1 = Integer.toString(result_score1);
          String stat="";
          if (result_score1 >= 80) {
            stat = "Passed";
        } else{
          stat = "Failed";
          }
          
         try
         {
            con = ConnectionManager.getConnection();
            stmt = con.createStatement();
            stmt.executeUpdate("INSERT INTO urlresult(site_name,site_url,speed_score,status,mobile_freindly_score)VALUES ('"+result_id+"', '"+result_id+"', '"+string_result_score0+"','"+stat+"','"+string_result_score1+"')");
            con.close();
         }
         catch(Exception ex)
         {
             System.out.println(ex);
         }
         
         return "true";
    }
   
}
