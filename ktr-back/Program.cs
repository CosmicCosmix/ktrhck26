using ktr_back.Services;
using Supabase;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Register Supabase client
var url = builder.Configuration["Supabase:Url"] ?? "https://YOUR_SUPABASE_URL.supabase.co";
var key = builder.Configuration["Supabase:Key"] ?? "YOUR_SUPABASE_KEY";
var options = new SupabaseOptions { AutoConnectRealtime = true };

builder.Services.AddSingleton(new Supabase.Client(url, key, options));
builder.Services.AddScoped(typeof(IGenericSupabaseService<>), typeof(GenericSupabaseService<>));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
