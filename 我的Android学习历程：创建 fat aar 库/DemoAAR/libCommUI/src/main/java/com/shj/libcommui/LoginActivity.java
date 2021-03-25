package com.shj.libcommui;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.util.Log;

import org.json.JSONObject;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class LoginActivity extends AppCompatActivity {
    private final static String LogTag = "app";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button openBtn = (Button) findViewById(R.id.btn_request);
        openBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final String Link= "http://httpbin.org/get";

                Runnable requestTask = new Runnable() {
                    @Override
                    public void run() {
                        try {
                            OkHttpClient client = new OkHttpClient();
                            Request request = new Request.Builder().url(Link).build();
                            Call call = client.newCall(request);
                            Response response = call.execute();

                            String result = response.body().string();
                            JSONObject jsonObj = new JSONObject(result);

                            Log.v(LogTag, jsonObj.toString());
                        } catch (Exception ex) {
                            Log.v(LogTag, ex.toString());
                        }
                    }
                };

                Thread requestThread = new Thread(requestTask);
                requestThread.start();
            }
        });
    }
}