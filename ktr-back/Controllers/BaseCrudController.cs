using ktr_back.Services;
using Microsoft.AspNetCore.Mvc;
using Postgrest.Models;

namespace ktr_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseCrudController<T> : ControllerBase where T : BaseModel, new()
    {
        protected readonly IGenericSupabaseService<T> _service;

        public BaseCrudController(IGenericSupabaseService<T> service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetById(string id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<T>> Create([FromBody] T entity)
        {
            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<T>> Update(string id, [FromBody] T entity)
        {
            // Set id on entity if possible, or assume it's already set in the body
            var updated = await _service.UpdateAsync(entity);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
