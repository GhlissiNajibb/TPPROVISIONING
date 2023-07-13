namespace Backend.Requests
{
    public class ModuleUpdateRequest
    {
        public string ModuleName { get; set; }
        public string Description { get; set; }
        public string ModulePackage { get; set; }
        public bool ModuleStatus { get; set; }

        public DateTime LastModificatedDate { get; set; }


        public List<int> ProductId { get; set; }
        //public List<string> ProductNames { get;  set; }
    }
    
    
} 
