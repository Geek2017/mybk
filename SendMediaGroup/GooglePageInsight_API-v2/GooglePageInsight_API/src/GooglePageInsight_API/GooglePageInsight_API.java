package GooglePageInsight_API;

public class GooglePageInsight_API {
 
    public static void main(String[] args) 
    {
         
       T cnt = new T();
        
       try
       {
          while(cnt.mythread.isAlive())
          {
            System.out.println("Running page insight"); 
            Thread.sleep(1500);
          }
       }
       catch(InterruptedException e)
       {
          System.out.println("Main thread interrupted");
       }
       System.out.println("google  pagesight stops" );
       
    } 
}