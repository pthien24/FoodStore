using System.Text.Json.Serialization;
using FoodStore.Web.Models.Domain;
using FoodStore.Web.Repository.Abstract;
using FoodStore.Web.Repository.Implementation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
builder.Services.AddDbContext<DatabaseContext>(opts =>
{
    opts.UseSqlServer(builder.Configuration.GetSection("ConnectionString")["conn"]);
});
builder.Services.AddTransient<IProductRepository, EFProductRepository>();
builder.Services.AddTransient<ICategoryRepository, EFCategoryRepository>();
builder.Services.AddTransient<IFileService, FileService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll"); // Apply CORS policy

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
    RequestPath = "/Resources"
});
app.UseCors("AllowAll");
app.UseAuthorization();
app.UseDeveloperExceptionPage();
app.MapControllers();

app.Run();
