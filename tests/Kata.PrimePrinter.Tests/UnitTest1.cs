using System;
using System.IO;
using Xunit;

namespace Kata.PrimePrinter.Tests
{
    public class UnitTest1 : IDisposable
    {
        private TextWriter _out;
        private const string GOLD = "gold_n_121.txt";
        private const string LEAD = "lead_n_121.txt";

        public UnitTest1()
        {
            _out = Console.Out;
            Console.SetOut(new StreamWriter(new FileStream(LEAD, FileMode.Create)));
        }

        public void Dispose()
        {
            Console.SetOut(_out);
        }

        [Fact]
        public void MakeSureOutputMatchesGold()
        {
            Program.Main(new string[0]);
            Console.Out.Close();
            var goldReader = new StreamReader(GetFileToRead(GOLD));
            var leadReader = new StreamReader(new FileStream(LEAD, FileMode.Open));
            
            string line;
            while ((line = goldReader.ReadLine()) != null)
            {
                string leadLine = leadReader.ReadLine();
                Assert.Equal(line, leadLine);
            }
            Assert.Null(leadReader.ReadLine());

        }

        private Stream GetFileToRead(string fileName)
        {
            var s = GetType().Assembly.GetManifestResourceStream(GetType().Assembly.GetName().Name + "." + fileName);
            return s;
        }
    }
}
